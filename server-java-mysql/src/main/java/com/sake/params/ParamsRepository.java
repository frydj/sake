package com.sake.params;

import org.springframework.data.jpa.repository.JpaRepository;

public abstract interface ParamsRepository extends JpaRepository<Param, Long> {

}