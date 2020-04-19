---
title: 인증 시스템에 대한 고민
category: devlog
subCategory: web
path: /web/2
date: 2019-09-24 13:07:00
---

세션 기반 인증과 토큰 기반 인증에 대한 개념을 아시면 3번부터 보셔도 될 것 같습니다.

## 세션 기반 인증

1. 클라이언트에서 로그인
2. 서버에서 유저 인증이 성공하면 유저 세션을 만들고 메모리나 데이터베이스에 저장
3. 서버가 클라이언트에게 유저 세션과 연결되는 세션ID 발급
4. 발급된 세션ID는 안전한 저장소(주로 브라우저의 쿠키)에 저장
5. 클라이언트에서 인증이 필요한 요청을 할 때마다, 세션ID 를 헤더에 넣어서 서버에 요청

### 단점

- 세션 쿠키 방식의 인증은 기본적으로 세션 저장소를 필요로 하기 때문에(Redis를 많이 사용), 서버 인스턴스가 여러 개가 된다면 모든 서버끼리 같은 세션을 공유해야 하므로, 서버를 확장하기가 번거로워질 수 있습니다. (무조건 세션 기반 인증 시스템이 좋지 않다는 건 아님. 뒤에 설명할 토큰 기반 인증도 단점이 존재하기 때문에, 잘 설계하면 세션 기반 인증 시스템도 충분히 좋은 시스템이 될 수 있음.)
- 공격자가 중간에서 세션ID를 탈취할 수 있습니다.(세션 하이재킹 공격).

  _→ 해결책: HTTPS를 사용해 세션ID 정보를 읽기 힘들게 하고, 세션에 유효 시간을 넣어 준다._

## 토큰 기반 인증(Access Token of JWT)

JWT 토큰은 보통 서버에서 사용자 인증(로그인)이 됐을 때, 리소스 사용 권한을 주기 위한 용도로 사용되는 토큰입니다.

1. 클라이언트에서 로그인
2. 서버에서 유저 인증이 성공하면 Secret Key를 사용하여 생성한 Access Token을 클라이언트에게 발급
3. 발급된 Access Token은 안전한 저장소(주로 브라우저의 쿠키)에 저장
4. 클라이언트에서 인증이 필요한 요청을 할 때마다, 토큰을 헤더에 넣어서 서버에 요청

### 장점

- 서버에서는 토큰의 Verify Signature를 Access Token을 생성할 때 가지고 있었던 Secret Key로 복호화한 후, 조작 여부, 유효기간을 확인하기 때문에, 서버에서 사용자 로그인 정보를 기억하기 위해 사용하는 리소스가 적습니다.
- 서버의 인스턴스가 여러 개로 늘어나도 서버끼리 사용자의 로그인 상태를 공유할 필요가 없이 Stateless 한 성질을 유지할 수 있으므로, 서버의 확장성이 높아집니다.

### 단점

- Token을 서버에서 관리하지 않기 때문에, 이미 발급된 JWT에 대해서는 돌이킬 수 없습니다. JWT는 한 번 발급되면 유효기간이 완료될 때 까지는 계속 사용이 가능하고, 악의적인 사용자는 유효기간이 지나기 전까지 신나게 정보들을 털어갈 수 있습니다.
  \_→ 해결책: HTTPS를 사용해 Token 정보를 읽기 힘들게 하고, Access Token의 유효기간을 짧게 하고, 유효기간이 더 긴 Refresh Token이라는 새로운 토큰을 발급하여 필요 시 Access Token이 갱신될 수 있도록 하거나, 상황에 따라 Sliding Session을 적절히 사용한다.
- 유저의 정보가 전부 서버의 저장소에 안전하게 보관되는 세션/쿠키 방식에 반해, JWT의 Payload는 따로 암호화되지 않기 때문에 디코딩하면 누구나 정보를 확인할 수 있습니다. 따라서 유저의 중요한 정보들은 Payload에 넣을 수 없기 때문에, Payload 정보가 제한적입니다.
- 세션/쿠키 방식에 비해 JWT의 길이는 길기 때문에, 인증이 필요한 요청은 서버의 오버헤드를 증가시킵니다.

## Refresh Token과 Sliding Session

토큰 인증 방식이 뭔지 알았다면, 토큰을 발급하고 인증하는 일종의 스펙을 만들어 서버와 클라이언트에서 토큰을 잘 관리해야 합니다.

위에서 JWT의 첫 번째 단점에 대한 해결책으로 Access Token의 유효기간을 짧게 하고, 유효기간이 더 긴 Refresh Token이라는 새로운 토큰을 발급하여 필요 시 Access Token이 갱신될 수 있도록 한다고 하거나, 상황에 따라 Sliding Session을 적절히 사용한다고 했습니다.

## Refresh Token

JWT는 Access Token만 있는 게 아니라, 크게 Access Token과 Refresh Token 두 가지로 분류되고 있습니다. Refresh Token을 Access Token과 함께 사용하여 Access Token이 탈취 당했을 때의 위험을 줄일 수 있습니다.

1. 클라이언트에서 로그인
2. 서버에서 유저 인증이 성공하면 Secret Key를 사용하여 생성한 Access Token과 Refresh Token을 클라이언트에게 발급
3. 발급된 Access Token과 Refresh Token은 안전한 저장소에 저장
4. 클라이언트에서 인증이 필요한 요청을 할 때마다, Access Token을 헤더에 넣어서 서버에 요청
5. 서버에서 Access Token을 검증하여 요청된 데이터 전송

4-1. 클라이언트에서 요청을 보내기 전에, Access Token의 만료기간이 지났다면, Refresh Token과 Access Token을 서버로 보냄

5-1. 서버는 받은 Access Token이 조작되지 않았는지 확인한후, Refresh Token과 사용자의 DB에 저장되어 있던 Refresh Token을 비교

6-1. 서버는 새로운 Access Token을 헤더에 실어 다시 API 요청을 진행

Refresh Token을 사용함으로써 Access Token만 사용할 때보다 안전해졌지만, Access Token이 만료될 때마다 새롭게 발급하는 과정에서 생기는 HTTP 요청 횟수가 많아졌고, 이는 서버의 오버헤드를 증가시킵니다.

## Sliding Session

Sliding Session은 유저의 특정 행위를 통해 유저 세션을 지속적으로 늘려주는 전략입니다. 예를 들어, 결제나 송금을 하다가 인증이 만료되는 경우를 막기 위해, 유저가 해당 행위를 시작할 때 해당 유저 세션의 만료기간을 연장해주는 것입니다.

토큰 기반 인증에서는 만료 기간을 새로 설정한 새로운 Access Token을 발급해준다거나, Refresh Token을 발급해주는 방식으로 사용할 수 있을 것 같습니다.

## JWT를 어디에 저장해야 하는가

Refresh Token을 Access Token과 함께 사용하여, Access Token이 탈취 당했을 때의 위험은 줄었습니다. 하지만, 클라이언트에서 Token들을 저장할 저장소의 안전성은 더욱 중요해졌습니다.

그렇다면, Access Token과 Refresh Token을 어디에 저장해야 하는가!

1. HTML5 Storage (Local Storage, Session Storage)

   자바스크립트로 제어가 가능하기 때문에 **XSS(cross-site scripting) 공격에 취약함.**

   해커가 자바스크립트 코드를 웹페이지에 심어 사용자의 정보를 탈취할 수 있음.

2. Cookies

   HttpOnly 옵션을 주어 자바스크립트로의 접근을 막아 XSS 공격을 막을 수 있지만, CSRF(cross-site request forgery) 라고 불리우는 또 다른 공격에 취약할 수 있다. 하지만, 이 공격도 막을 수 있음.

보안이라는 게 완벽할 순 없겠지만, XSS 공격을 방어할 수 있는 쿠키에 저장하는 것이 더 적절하다고 생각됩니다.

## Reference

- https://velopert.com/2389
- https://blog.outsider.ne.kr/1160
- https://swalloow.github.io/implement-jwt
