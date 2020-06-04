package com.example.springbootbackendapirest.models.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.springbootbackendapirest.models.entity.Factura;



public interface IFacturaDao extends CrudRepository<Factura, Long>{

	
	@Query("select factura from Factura factura where id = ?1")
	public Optional<Factura> findById(Long id);
}
