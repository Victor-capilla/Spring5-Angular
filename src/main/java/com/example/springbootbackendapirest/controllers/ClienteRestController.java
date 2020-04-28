package com.example.springbootbackendapirest.controllers;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springbootbackendapirest.models.entity.Cliente;
import com.example.springbootbackendapirest.models.entity.Region;
import com.example.springbootbackendapirest.models.services.IClienteService;
import com.example.springbootbackendapirest.models.services.IUploadFileService;
import com.example.springbootbackendapirest.models.services.UploadFileServiceImpl;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/")
public class ClienteRestController {
	
	private final Logger log = LoggerFactory.getLogger(ClienteRestController.class);
	
	@Autowired
	private IClienteService clienteService;
	
	@Autowired
	private IUploadFileService uploadFileServiceImpl;

	@GetMapping("/clientes")
	public List<Cliente> index(){
		return clienteService.findAll();
		
	}
	
	@Secured({"ROLE_ADMIN"})
	@GetMapping("/regiones")
	public List<Region> regiones(){
		return clienteService.findAllRegiones();
		
	}
	
	@GetMapping("/clientes/pagina/{page}")
	public Page<Cliente>  index(@PathVariable Integer page){
		return clienteService.findAll(PageRequest.of(page, 5));
		
	}
	
	
	@GetMapping("/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource>  index(@PathVariable String nombreFoto) {
		Resource recurso = null;
		try {
			recurso =  uploadFileServiceImpl.cargar(nombreFoto);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename =\""+ recurso.getFilename()+ "\"");
		return new ResponseEntity<Resource>(recurso,cabecera, HttpStatus.OK);
		
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> show(@PathVariable Long id){
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		try {
			cliente = clienteService.findByID(id);	
		} catch (Exception e) {
			response.put("mensaje", "Error al realizar la consulta en la bbdd");
			response.put("error", e.getMessage());
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		if (cliente== null) {
			response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe en la bbdd")));
			return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(cliente , HttpStatus.OK);
		
	}
	
	@Secured({"ROLE_ADMIN"})
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) throws IOException {
		Map<String, Object> response = new HashMap<>();
		try {
			Cliente cliente = clienteService.findByID(id);
			uploadFileServiceImpl.eliminar(cliente.getFoto());
			clienteService.delete(id);	
		} catch (DataAccessException e) {
			response.put("Mensaje","El cliente no existe en bbdd , con lo cual no ha podido eliminarse");
			response.put("error",e.getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
			
		
		response.put("mensaje", "El cliente ha sido eliminado con exito de la bbdd");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/clientes")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteAll(@RequestBody List<Cliente> clientes) {
		clienteService.deleteAll(clientes);
	}
	
	@Secured({"ROLE_ADMIN"})
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Cliente cliente,BindingResult result, @PathVariable Long id) {
		Cliente clienteActual = clienteService.findByID(id);
		Cliente clienteUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasFieldErrors()) {
			List<String> errores = result.getFieldErrors()
					.stream()
					.map(error -> "El campo" + error.getField() + " "+ error.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("errores" , errores);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		if (clienteActual == null) {
			response.put("mensaje", "Error : el cliente ".concat(cliente.getId().toString()).concat(" no existe en la bbdd"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			clienteActual.setApellido(cliente.getApellido());
			clienteActual.setEmail(cliente.getEmail());
			clienteActual.setNombre(cliente.getNombre());
			clienteActual.setCreateAt("".equals(cliente.getCreateAt()) || "null".equals(cliente.getCreateAt())?new Date() : cliente.getCreateAt());
			clienteActual.setRegion(cliente.getRegion());
			clienteUpdated=clienteService.save(clienteActual);
		} catch (DataAccessException e) {
			response.put("mensaje", "error al actualizar el cliente en la bbdd");
			response.put("error", e.getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El cliente ha sido actualizado con exito");
		response.put("cliente", clienteUpdated);
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured({"ROLE_ADMIN"})
	@PostMapping("/clientes")
	//@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente,BindingResult result ) {
		Cliente clienteNew = null;
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasFieldErrors()) {
			List<String> errores = result.getFieldErrors()
					.stream()
					.map(error -> "El campo" + error.getField() + " "+ error.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("errores" , errores);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			log.info("ANTES el puto cliente :"+cliente);
			
			clienteNew = clienteService.save(cliente);
			log.info("DSEPUES el puto cliente :"+cliente);
		} catch (Exception e) {
			response.put("mensaje", "Error al insertar en la bbdd");
			response.put("error", e.getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "Cliente creado con exito");
		response.put("cliente", clienteNew);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PostMapping("clientes/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id){
		Map<String, Object> response = new HashMap<>();
		Cliente cliente = clienteService.findByID(id);
		
		if (cliente == null) {
			response.put("mensaje" , "el archivo no ha podido subirse porque el usuario no existe");
			return new ResponseEntity<Map<String, Object>>(response , HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (!archivo.isEmpty()) {
			String nombreArchivo ;
			try {
				nombreArchivo = uploadFileServiceImpl.copiar(archivo);
				
			} catch (IOException e) {
				response.put("mensaje" ,"hubo un error al subir la foto".concat(archivo.getOriginalFilename()));
				response.put("error" ,"El error que se ha producido es : ".concat(e.getMessage()).concat(" debido a :").concat(e.getCause().getMessage()));
				
				return new ResponseEntity<Map<String, Object>>(response , HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			cliente.setFoto(nombreArchivo);
			clienteService.save(cliente);
			response.put("mensaje" ,"Se ha subido una foto la foto ".concat(archivo.getName()).concat(" para el usuario ").concat(cliente.getNombre()).concat( "con exito"));
			response.put("cliente", cliente);
		}

		return new ResponseEntity<Map<String, Object>>(response , HttpStatus.CREATED);
	}
	
	
}
