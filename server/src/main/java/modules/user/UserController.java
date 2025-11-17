package modules.user;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty()) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("message", "Usuario no encontrado");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    // Crear usuario
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        User savedUser = userRepository.save(newUser);

        HashMap<String, Object> response = new HashMap<>();
        response.put("message", "Usuario creado correctamente");
        response.put("data", savedUser);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User data) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("message", "Usuario no encontrado");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();
        user.setNombreCompleto(data.getNombreCompleto());
        user.setCorreo(data.getCorreo());
        user.setTelefono(data.getTelefono());

        userRepository.save(user);

        HashMap<String, Object> response = new HashMap<>();
        response.put("message", "Usuario actualizado correctamente");
        response.put("data", user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("message", "Usuario no encontrado");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        userRepository.deleteById(id);

        HashMap<String, Object> response = new HashMap<>();
        response.put("message", "Usuario eliminado correctamente");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
