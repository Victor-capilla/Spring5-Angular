package com.example.springbootbackendapirest.models.services;

import java.util.List;
import java.util.stream.Collectors;

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
public class UsuarioService implements UserDetailsService{
	
	@Autowired
	private IUsuarioDao iUsuarioDao;
	
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = iUsuarioDao.findByUsername(username);
		List<GrantedAuthority> authorities = usuario.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getNombre())).collect(Collectors.toList());
		return new User(username, usuario.getPassword(), usuario.isEnabled(), true, true, true, authorities);
	}

}
