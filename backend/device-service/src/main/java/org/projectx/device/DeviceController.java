package org.projectx.device;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    @GetMapping
    public ResponseEntity all(Principal principal) {
        return ResponseEntity.status(200).body(principal);
    }
}
