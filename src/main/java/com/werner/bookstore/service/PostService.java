package com.werner.bookstore.service;

import com.werner.bookstore.domain.Book;
import com.werner.bookstore.repository.BookRepository;
import com.werner.bookstore.web.rest.dto.PostImageDTO;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import javax.inject.Inject;
import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service("PostService")
@Transactional
public class PostService {

    private final Logger log = LoggerFactory.getLogger(PostService.class);

    @Value("${bookstore.upload.path}")
    private String user_upload_file_root_path;

    @Inject
    private BookRepository bookRepository;

    @Autowired
    ServletContext servletContext;

    public PostImageDTO saveSingleImageForPost(Long productId, MultipartFile file) throws IOException {

        Book book = bookRepository.findOne(productId);
        String imageFileName = System.currentTimeMillis() + "_" + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String rootPath = user_upload_file_root_path;
        String fileName = rootPath;

        log.debug("new saving file folder -> " + fileName);
        File newSavedFile = new File(fileName);
        if (!newSavedFile.exists()) {
            newSavedFile.mkdir();
        }
        FileOutputStream fileOutputStream = new FileOutputStream(new File(fileName + "/" + imageFileName));
        IOUtils.copy(file.getInputStream(), fileOutputStream);
        book.setPhoto(imageFileName);
        book = bookRepository.saveAndFlush(book);
        PostImageDTO image = new PostImageDTO(book.getId(), imageFileName);

        return image;
    }

    public PostImageDTO saveSingleImageForPost(MultipartFile file) throws IOException {

        String imageFileName = System.currentTimeMillis() + "_" + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String rootPath = user_upload_file_root_path;
        String fileName = rootPath;

        log.debug("new saving file folder -> " + fileName);
        File newSavedFile = new File(fileName);

        if (!newSavedFile.exists()) {
            newSavedFile.mkdir();
        }
        FileOutputStream fileOutputStream = new FileOutputStream(new File(fileName + "/" + imageFileName));
        IOUtils.copy(file.getInputStream(), fileOutputStream);
        PostImageDTO image = new PostImageDTO(null, imageFileName);
        return image;
    }

    public PostImageDTO checkUploadImage(MultipartFile file) throws IOException {

        String imageFileName = System.currentTimeMillis() + "_" + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String rootPath = user_upload_file_root_path;

        String fileName = rootPath;
        log.debug("new saving file folder -> " + fileName);
        File newSavedFile = new File(fileName);

        if (!newSavedFile.exists()) {
            newSavedFile.mkdir();
        }
        FileOutputStream fileOutputStream = new FileOutputStream(new File(fileName + "/" + imageFileName));
        IOUtils.copy(file.getInputStream(), fileOutputStream);
        PostImageDTO image = new PostImageDTO(null, imageFileName);

        return image;
    }
}
