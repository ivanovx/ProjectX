package pro.ivanov.webapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pro.ivanov.webapp.model.Device;
import pro.ivanov.webapp.repository.DeviceRepository;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {

    private final DeviceRepository deviceRepository;

    public HomeController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    public List<Device> index() {
        return this.deviceRepository.findAll();
    }
}
