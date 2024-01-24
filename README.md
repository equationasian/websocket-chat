# Chat App - babble
I initially created this project as a fun introduction to the Spring framework and basic JavaScript for myself. It's an ongoing project I plan to further develop as I dive deeper into full stack development.

## Description
Until the user is authenticated, the only available pages are the login and registration pages. At the moment, there is no database in this application. Instead, all user information is encoded and stored in memory using Spring Security's [InMemoryUserDetailsManager](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/in-memory.html), therefore information for any newly registered users will be wiped each time the application is started. For quick testing, there is a pre-created account:
```
username: user
password: password
```
On a successful login, the user will be redirected to the chat room.

## Resources
- [Spring WebSocket documentation](https://docs.spring.io/spring-framework/docs/4.3.x/spring-framework-reference/html/websocket.html#websocket-stomp-enable)
- [StompJS documentation](https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html)
- [Spring Security intro project](https://spring.io/guides/gs/securing-web/)
- [Enable STOMP over WebSockets](https://docs.spring.io/spring-framework/docs/4.3.x/spring-framework-reference/html/websocket.html#websocket-stomp-enable)
- [Examples of Spring Boot with STOMP](https://www.toptal.com/java/stomp-spring-boot-websocket)
