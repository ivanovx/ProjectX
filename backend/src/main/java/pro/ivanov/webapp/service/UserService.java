package pro.ivanov.webapp.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pro.ivanov.webapp.ApiRequestException;
import pro.ivanov.webapp.model.Device;
import pro.ivanov.webapp.model.User;
import pro.ivanov.webapp.repository.UserRepository;
import pro.ivanov.webapp.responseModel.UserResponse;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // TODO
    // Here email service to verify
    public ResponseEntity<UserResponse> verifyUser(String username) {
        User user = this.userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ApiRequestException("User with %s username not found".formatted(username)));

        User currentUser = this.getCurrentUser();

        checkUser(user, currentUser);

        if (user.isActive()) {
            throw new ApiRequestException("User with %s is verified.".formatted(username));
        }

        user.setActive(true);

        UserResponse response = UserResponse.of(this.userRepository.save(user));

        return ResponseEntity.ok(response);
    }

    // Todo
    // check verified first
    public ResponseEntity<UserResponse> getAuthUser() {
        UserResponse response = UserResponse.of(this.getCurrentUser());

        return ResponseEntity.ok(response);
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    // Todo check owner
    private void checkUser(User user1, User user2) {
        if (user1.getId().compareTo(user2.getId()) != 0) {
            throw new ApiRequestException("This user not you.");
        }
    }
}
