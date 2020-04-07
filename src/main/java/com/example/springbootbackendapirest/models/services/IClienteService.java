package com.example.springbootbackendapirest.models.services;

import java.util.List;

import com.example.springbootbackendapirest.models.entity.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll();
}
