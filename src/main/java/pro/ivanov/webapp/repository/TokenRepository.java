package pro.ivanov.webapp.repository;

import org.springframework.data.repository.CrudRepository;
import pro.ivanov.webapp.entity.Token;

import java.util.Optional;
import java.util.UUID;

public interface TokenRepository extends CrudRepository<Token, UUID> {
    Optional<Token> findByToken(String token);
}
