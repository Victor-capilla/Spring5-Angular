package com.example.springbootbackendapirest.models.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springbootbackendapirest.models.dao.IUsuarioDao;
import com.example.springbootbackendapirest.models.entity.Usuario;

@Service
public class UsuarioService implements UserDetailsService , IUsuarioService{
	
	private Logger log = LoggerFactory.getLogger(UsuarioService.class);
	
	@Autowired
	private IUsuarioDao iUsuarioDao;
	
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = findByUsername(username);
		
		if ("null".equals(usuario)) {
			log.error("Error al loguear : el usuario ".concat(usuario.getUsername()).concat(" no existe"));
			throw new UsernameNotFoundException("Error al loguear : el usuario ".concat(usuario.getUsername()).concat(" no existe"));
		}
		List<GrantedAuthority> authorities = usuario.getRoles()
				.stream()
				.map(role -> new SimpleGrantedAuthority(role.getNombre()))
				.peek(auth -> log.info("Role : ".concat(auth.getAuthority())))
				.collect(Collectors.toList());
		return new User(username, usuario.getPassword(), usuario.isEnabled(), true, true, true, authorities);
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findByUsername(String nombre) {
		// TODO Auto-generated method stub
		return iUsuarioDao.findByUsername(nombre);
	}

}
