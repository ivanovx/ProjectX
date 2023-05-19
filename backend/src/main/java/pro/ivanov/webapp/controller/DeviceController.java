package pro.ivanov.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pro.ivanov.webapp.model.Device;
import pro.ivanov.webapp.model.User;
import pro.ivanov.webapp.repository.DeviceRepository;
import pro.ivanov.webapp.repository.UserRepository;
import pro.ivanov.webapp.responseModel.DeviceResponse;

import java.security.Principal;
import java.time.LocalDateTime;
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
    public List<Device> allDevices(Principal principal) {
        User user = this.userRepository.findByEmail(principal.getName()).orElseThrow();

        return this.deviceRepository.findAllByUserId(user.getId());
    }

    @GetMapping("/{id}")
    public Device getDevice(@PathVariable String id) {
        return this.deviceRepository.findById(id).orElseThrow();
    }

    @PostMapping("/create")
    public ResponseEntity<DeviceResponse> createDevice(@RequestBody Device device, Principal principal) {
        User user = this.userRepository.findByEmail(principal.getName()).orElseThrow();

        device.setUser(user);
        device.setCreatedOn(LocalDateTime.now());
        device.setActivated(false);
        device.setActivatedOn(null);

        Device savedDevice = this.deviceRepository.save(device);

        DeviceResponse response = DeviceResponse
                .builder()
                .name(savedDevice.getName())
                .isOutdoor(savedDevice.isOutdoor())
                .isActivated(savedDevice.isActivated())
                .createdOn(savedDevice.getCreatedOn())
                .activatedOn(savedDevice.getActivatedOn())
                .coordinates(savedDevice.getCoordinates())
                .user(savedDevice.getUser().getUsername())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/activate/{id}")
    public ResponseEntity<DeviceResponse> activateDevice(@PathVariable String id, Principal principal) {
       // User user = this.userRepository.findByEmail(principal.getName()).orElseThrow();
        Device device = this.deviceRepository.findById(id).orElseThrow();

       /* if (device.getUser().getId().compareTo(user.getId()) == 0) {
            // THROW
        }*/

        device.setActivated(true);
        device.setActivatedOn(LocalDateTime.now());

        Device savedDevice = this.deviceRepository.save(device);

        DeviceResponse response = DeviceResponse
                .builder()
                .name(savedDevice.getName())
                .isActivated(savedDevice.isActivated())
                .createdOn(savedDevice.getCreatedOn())
                .activatedOn(savedDevice.getActivatedOn())
                .coordinates(savedDevice.getCoordinates())
                .user(savedDevice.getUser().getUsername())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update/{id}")
    public Device updateDevice(@PathVariable String id, @RequestBody Device updatedDevice, Principal principal) {
        User user = this.userRepository.findByEmail(principal.getName()).orElseThrow();
        Device device = this.deviceRepository.findById(id).orElseThrow();

        if (device.getUser().getId().compareTo(user.getId()) == 0) {
            // THROW
        }

        return updatedDevice;
    }

    @PostMapping("/delete/{id}")
    public Device deleteDevice(@PathVariable String id, Principal principal) {
        User user = this.userRepository.findByEmail(principal.getName()).orElseThrow();
        Device device = this.deviceRepository.findById(id).orElseThrow();

        if (device.getUser().getId().compareTo(user.getId()) == 0) {
            // THROW
        }

        this.deviceRepository.deleteById(id);

        return device;
    }
}
