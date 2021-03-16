package com.sake.customers.search;

import org.springframework.data.jpa.repository.JpaRepository;

public abstract interface CustomerSearchRepository extends JpaRepository<CustomerSearch, Long> {

}