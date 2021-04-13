package com.sake.typeAhead;

// import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "type_ahead")
public class TypeAhead {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long Id;
	private Long sessionId;
	private String returnedData;
	private String secondary;
	
	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
	}
	public String getSecondary() {
		return secondary;
	}
	public void setSecondary(String secondary) {
		this.secondary = secondary;
	}
	public Long getSessionId() {
		return sessionId;
	}
	public void setSessionId(Long sessionId) {
		this.sessionId = sessionId;
	}
	public String getReturnedData() {
		return returnedData;
	}
	public void setReturnedData(String returnedData) {
		this.returnedData = returnedData;
	}
}