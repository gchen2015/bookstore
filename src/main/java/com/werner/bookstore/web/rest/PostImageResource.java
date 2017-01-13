package com.werner.bookstore.web.rest;

import com.werner.bookstore.service.PostService;
import com.werner.bookstore.web.rest.dto.PostImageDTO;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URISyntaxException;

/**
 * REST controller for managing Book Image upload.
 */
@RestController
@RequestMapping("/api")
public class PostImageResource {

    private final Logger log = LoggerFactory.getLogger(PostImageResource.class);

    @Inject
    private PostService postService;

    /**
     * POST /userPosts -> Create a new userPost.
     *
     * @throws IOException
     */
    @RequestMapping(value = "/postImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostImageDTO> createWithSingleImage(
        @RequestParam(value = "bookid", required = false) Long bookid,
        @RequestParam(value = "file", required = false) MultipartFile file) throws URISyntaxException, IOException {

        log.debug("REST request to save single image for post id = : {}", bookid);
        log.debug("path:" + System.getProperty("user.dir"));

        if (bookid == 0) {// for creating a new product without a id now
            PostImageDTO postImage = postService.saveSingleImageForPost(file);

            return ResponseEntity.ok(postImage);
        }

        if (bookid != null) {
            PostImageDTO postImage = postService.saveSingleImageForPost(bookid, file);

            return ResponseEntity.ok(postImage);
        } else {

            return ResponseEntity.badRequest().body(null);
        }

    }

    @RequestMapping(value = "/postPhoto", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostImageDTO> postPhoto(
        @RequestParam(value = "file", required = false) MultipartFile file) throws URISyntaxException, IOException {

        log.debug("path:" + System.getProperty("user.dir"));

        PostImageDTO postImage = postService.saveSingleImageForPost(file);

        if (StringUtils.isNotEmpty(postImage.getImage())) {

            return ResponseEntity.ok(postImage);
        } else {

            return ResponseEntity.badRequest().body(null);
        }

    }

    @RequestMapping(value = "/ckuploadImage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostImageDTO> ckuploadImage(
        HttpServletRequest request,
        HttpServletResponse response,
        @RequestParam(value = "CKEditorFuncNum", required = false) String CKEditorFuncNum,
        @RequestParam(value = "uploadContentType", required = false) String uploadContentType,
        @RequestParam(value = "fileName", required = false) String fileName,
        @RequestParam(value = "uploadFileName", required = false) String uploadFileName,
        @RequestParam(value = "upload", required = false) MultipartFile upload) throws URISyntaxException, IOException {

        log.debug("REST request to save single image for post id = : {}");
        log.debug("path:" + System.getProperty("user.dir"));


        if (upload != null) {
            PostImageDTO postImage = postService.checkUploadImage(upload);
            return ResponseEntity.ok(postImage);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
