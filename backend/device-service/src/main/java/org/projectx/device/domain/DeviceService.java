package org.projectx.device.domain;

import java.security.Principal;
import java.util.List;
import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<Device> getAll() {
        List<Device> response = this.deviceRepository.findAll();
                //.stream()
                //.map(device -> DeviceResponse.of(device))
                //.toList();

        return response;
    }

    // todo
    public List<Device> getAllActivated() {
        List<Device> response = this.deviceRepository
                .findAll()
                .stream()
               // .filter(device -> device.isActivated())
                //.map(device -> DeviceResponse.of(device))
                .toList();

        return response;
    }

    public List<Device> getAllByUser(String user) {
        List<Device> response = this.deviceRepository
                .findAllByUser(user);
                //.stream()
                //.map(device -> DeviceResponse.of(device))
                //.toList();

        return response;
    }

    public List<Device> getAllByUser(Principal principal) {
        return this.getAllByUser(principal.getName());
    }

    public Device getById(String id) {
        Device device = this.findById(id);
        //DeviceResponse response = DeviceResponse.of(device);

        //return ResponseEntity.ok(response);

        return device;
    }

    public Device create(DeviceRequest request) {
        Device device = new Device();

        device.setName(request.getName());
        device.setSensors(request.getSensors());
        device.setOutdoor(request.isOutdoor());
        device.setController(request.getController());
        device.setCreated(LocalDateTime.now());
        device.setModified(null);
        device.setActivated(null);
        device.setCoordinates(request.getCoordinates());
        //device.setUser(this.getCurrentUser().getSubject());

        return this.deviceRepository.save(device);
    }

    public Device update(String id, DeviceRequest request) {
        Device device = this.findById(id);

        device.setName(request.getName());
        device.setCoordinates(request.getCoordinates());
        device.setModified(LocalDateTime.now());
       // device.setUpdatedOn(LocalDateTime.now());

        //this.checkUser(device, this.getCurrentUser());

       // device.setOutdoor(request.isOutdoor());
        //device.setCoordinates(request.getCoordinates());

       // device.setModified(LocalDateTime.now());

       // DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        //return ResponseEntity.ok(response);

        return this.deviceRepository.save(device);
    }

    public ResponseEntity delete(String id) {
        Device device = this.findById(id);

        //this.checkUser(device, this.getCurrentUser());

        this.deviceRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    public Device activate(String id) {
        Device device = this.findById(id);

        device.setActivated(LocalDateTime.now());

       // this.checkUser(device, this.getCurrentUser());

        //device.setActivated(true);
        //device.setActivatedOn(LocalDateTime.now());
        //device.setActivated(LocalDateTime.now());

        //DeviceResponse response = DeviceResponse.of(this.deviceRepository.save(device));

        return this.deviceRepository.save(device);
    }

   // private Jwt getCurrentUser() {
    //   return (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  // }

    // Todo check owner
   /* private void checkUser(Device device, User user) {
        if (device.getUser().getId().compareTo(user.getId()) != 0) {
            throw new ApiRequestException("Device with is=%s not yours".formatted(device.getId()));
        }
    }*/

    private Device findById(String id) {
        return this.deviceRepository
                .findById(id)
                .orElseThrow(/*() -> new ApiRequestException("Device with id=%s not found".formatted(id))*/);
    }
}
