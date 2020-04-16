package com.example.springbootbackendapirest.models.services;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;

import com.example.springbootbackendapirest.models.entity.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Page<Cliente> findAll(Pageable pageable);
	
	public Cliente findByID(Long id);
	
	public Cliente save(Cliente cliente);
	
	public List<Cliente> saveAll(List<Cliente> clientes);
	
	public void delete(Long id);
	
	public void deleteAll(List<Cliente> clientes);
	
	 }
