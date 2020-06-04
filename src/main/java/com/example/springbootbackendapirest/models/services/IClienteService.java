package com.example.springbootbackendapirest.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.springbootbackendapirest.models.entity.Cliente;
import com.example.springbootbackendapirest.models.entity.Factura;
import com.example.springbootbackendapirest.models.entity.Region;

public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Page<Cliente> findAll(Pageable pageable);
	
	public Cliente findByID(Long id);
	
	public Cliente save(Cliente cliente);
	
	public List<Cliente> saveAll(List<Cliente> clientes);
	
	public void delete(Long id);
	
	public void deleteAll(List<Cliente> clientes);
	
	public List<Region> findAllRegiones();
	
	public Factura findFacturaById(Long id);
	
	public Factura saveFactura(Factura factura);
	
	public void deleteFacturaById(Long id);
	
	 }
