package pro.ivanov.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
  /*  @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                //.cors(c -> this.corsConfigurationSource())
                .csrf(c -> c.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                //.authorizeHttpRequests(c -> c.requestMatchers("/user/**", "/home/**", "/measurements/**").permitAll().anyRequest().authenticated())
                //.oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                .build();
    }*/

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeExchange(exchanges -> exchanges.pathMatchers("/user/**", "/home/**").permitAll().anyExchange().authenticated())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));

        return http.build();
    }
}
