package pro.ivanov.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pro.ivanov.webapp.model.Device;
import pro.ivanov.webapp.repository.DeviceRepository;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private DeviceRepository deviceRepository;

    @GetMapping
    public List<Device> index() {
        return this.deviceRepository.findAll();
    }
}
