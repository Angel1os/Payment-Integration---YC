package com.angellos.payment.repository;

import com.angellos.payment.entity.PDestination;
import com.angellos.payment.entity.PSender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DestinationRepository extends JpaRepository<PDestination, UUID> {


    @Query("""
        select d
        from  PDestination  d
        where d.id = :id
        """)
    PDestination findByUUId(@Param("id")UUID id);
}
