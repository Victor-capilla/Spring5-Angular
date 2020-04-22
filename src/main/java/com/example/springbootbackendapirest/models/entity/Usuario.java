package com.example.springbootbackendapirest.models.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name="usuarios")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	@NotEmpty
	@Column(nullable = false , unique = true)
	@Size(min = 4 , max = 20)
	private String username;
	
	@NotEmpty
	@Column(nullable = false)
	@Size(min = 8 , max = 20)
	private String password;
	
	@ManyToMany(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
	@JoinTable(name = "users_authorities" , uniqueConstraints = {@UniqueConstraint(columnNames = {"roles_id" , "usuarios_id"})})
	private List<Role> roles;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	private boolean enabled;
	
	private static final long serialVerionUID = 1L;

}
