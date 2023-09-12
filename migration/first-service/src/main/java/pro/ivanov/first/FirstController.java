package pro.ivanov.first;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class FirstController {

    @Autowired
    private DeviceRepository deviceRepo;

    @RequestMapping(value = "/first", method = RequestMethod.GET)
    public List<Device> devices() {
        return this.deviceRepo.findAll();
    }

    @RequestMapping(value = "/first", method = RequestMethod.POST)
    public Device create() {
        LocalDateTime localDateTime = LocalDateTime.now();

        Device device = new Device();

        device.setName(localDateTime.toString());
        device.setName("Created device with name: %s".formatted(device.getName()));

        return this.deviceRepo.save(device);
    }
}
