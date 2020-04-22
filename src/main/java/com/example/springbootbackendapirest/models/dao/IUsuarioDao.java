package com.example.springbootbackendapirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springbootbackendapirest.models.entity.Usuario;

public interface IUsuarioDao extends  JpaRepository<Usuario, Long>{
	
	public Usuario findByUsername(String nombre);

}
