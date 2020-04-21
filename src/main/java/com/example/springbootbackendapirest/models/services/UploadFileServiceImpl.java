package com.example.springbootbackendapirest.models.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileServiceImpl implements IUploadFileService{
	
	private final static String DIRECTORIO_UPLOAD = "uploads";

	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);


	@Override
	public Resource cargar(String nombreFoto) throws MalformedURLException {
		Path rutaArchivo = getPath(nombreFoto);
		Resource recurso = null;
		
		recurso = new UrlResource(rutaArchivo.toUri());
		
		if (!recurso.exists() && !recurso.isReadable()) {
			rutaArchivo = Paths.get("src/main/resources/static/images").resolve("no-user.png").toAbsolutePath();
			recurso = new UrlResource(rutaArchivo.toUri());
		}
		
		log.info("subida la foto : "+ nombreFoto);
		return recurso;
	}

	@Override
	public boolean eliminar(String nombrefoto) {
		if (nombrefoto != null && nombrefoto.isEmpty()) {
			Path rutaFotoAnterior = getPath(nombrefoto);
			File archivoFotoAnteror = rutaFotoAnterior.toFile();
			if (archivoFotoAnteror.exists() && archivoFotoAnteror.canRead()) {
				archivoFotoAnteror.delete();
				return true;
			}
		}
		return false;
	}

	@Override
	public Path getPath(String nombrefoto) {
		return Paths.get(DIRECTORIO_UPLOAD).resolve(nombrefoto).toAbsolutePath();
	}

	@Override
	public String copiar(MultipartFile archivo) throws IOException {
		String nombreArchivo = UUID.randomUUID().toString().concat("_").concat(archivo.getOriginalFilename()).replace(" ", "").trim();
		Path rutaCompleta = Paths.get("uploads").resolve(nombreArchivo).toAbsolutePath();
		Files.copy(archivo.getInputStream(), rutaCompleta);
		return nombreArchivo;
	}

}
