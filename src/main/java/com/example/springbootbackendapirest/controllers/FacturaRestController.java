package com.example.springbootbackendapirest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackendapirest.models.entity.Factura;
import com.example.springbootbackendapirest.models.services.IClienteService;

@RestController
//@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("/")
public class FacturaRestController {
	
	@Autowired
	private IClienteService clienteService;
	
	@GetMapping("facturas/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public Factura show(@PathVariable Long id) {
		return clienteService.findFacturaById(id);
	}
}
