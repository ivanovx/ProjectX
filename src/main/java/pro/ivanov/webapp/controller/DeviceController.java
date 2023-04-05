package pro.ivanov.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pro.ivanov.webapp.entity.Coordinates;
import pro.ivanov.webapp.entity.Device;
import pro.ivanov.webapp.repository.DeviceRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
public class DeviceController {
    @Autowired
    private DeviceRepository deviceRepository;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Device> allDevices() {
        return this.deviceRepository.findAll();
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Device createDevice() {
        Device device = new Device();

        device.setId(UUID.randomUUID());
        device.setTitle("Sample device");
        device.setCoordinates(new Coordinates(10, 10));

        return this.deviceRepository.save(device);
    }
}