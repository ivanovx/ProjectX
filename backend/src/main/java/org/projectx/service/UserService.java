package org.projectx.service;

import org.projectx.repository.UserRepository;
import org.projectx.response.UserResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.projectx.ApiRequestException;
import org.projectx.model.User;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // TODO
    // Verify user

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
