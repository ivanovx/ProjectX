package pro.ivanov.second;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecondController {

    @RequestMapping("/second")
    public String greeting() {
        return "Greeting from second!";
    }
}
