package com.example.springbootbackendapirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.springbootbackendapirest.models.entity.Cliente;
import com.example.springbootbackendapirest.models.entity.Region;

public interface IClienteDao extends JpaRepository<Cliente, Long>{
	
	@Query("from Region")
	public List<Region> findAllRegiones();
}
