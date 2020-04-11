package com.example.springbootbackendapirest.models.services;

import java.util.List;

import com.example.springbootbackendapirest.models.entity.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Cliente findByID(Long id);
	
	public Cliente save(Cliente cliente);
	
	public List<Cliente> saveAll(List<Cliente> clientes);
	
	public void delete(Long id);
	
	public void deleteAll(List<Cliente> clientes);
	
	 }
