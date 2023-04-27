package pro.ivanov.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pro.ivanov.webapp.entity.Device;
import pro.ivanov.webapp.entity.User;
import pro.ivanov.webapp.repository.DeviceRepository;
import pro.ivanov.webapp.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;


    @Autowired
    public DeviceController(DeviceRepository deviceRepository, UserRepository userRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Device> allDevices() {
        return this.deviceRepository.findAll();
    }

    @PostMapping
    public Device createDevice(@RequestBody Device device, Principal principal) {
        User user = this.userRepository.findByEmail(principal.getName()).orElseThrow();

        device.setUser(user);

        return this.deviceRepository.save(device);
    }
}
