package com.werner.bookstore.repository;

import com.werner.bookstore.domain.Book;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Book entity.
 */
@SuppressWarnings("unused")
public interface BookRepository extends JpaRepository<Book,Long> {

    @Query("select b from Book AS b  order by b.publicationDate desc ")
    public List<Book> findAllNewsBooks();
}
