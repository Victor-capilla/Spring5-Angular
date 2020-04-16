package com.example.springbootbackendapirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springbootbackendapirest.models.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long>{
	
}
