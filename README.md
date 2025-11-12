# HERTA-BOT
![npm verson](https://img.shields.io/badge/npm-11.6.1-orange.svg)
![discord js](https://img.shields.io/badge/discord.js-14.23.2-7289da.svg)
![enkanetwork](https://img.shields.io/badge/Enkanetwork.js-2.10.10-lightblue.svg)
![GitHub release](https://img.shields.io/github/release/Danielkim5216/herta-Bot?&color=00bfff)

> ## 스타레일 정보 검색 디스코드 봇
Node.js Enka.Network/MiHoMo API 래퍼인 StarRail.js를 사용하고 있습니다. 


## 명령어
- `/uidsearch` : uid로 유저 정보 출력
- `/getcharacter` : 스타레일 캐릭터 정보 출력
- `/getlightconeInfo` : 광추 정보 출력

## 공지
`uidsearch` 명령어로 유저 정보를 출력할 수 있습니다. 
> [!WARNING] 
> 다만 유저 프로필이 플레이어블 캐릭터가 아니면 캐릭터 이미지가 출력되지 않습니다.

`getcharacter` 명령어로 모든 스타레일 캐릭터 이름-원소 정보를 출력할 수 있습니다.

`/getlightconeInfo` 명령어로 광추 이름을 넣어 광추 이미지와 운명의 길, 광추 등급 정보를 확인할 수 있습니다.

## 앞으로 추가될 명령어/기능 (계속 업데이트중)
> [!NOTE]
> - 특정 광추의 돌파/레벨을 선택해서 기초HP,공격력,방어력 확인 가능
> - `/myuiduidRegister`로 uid를 등록해두면 `/myStarrail` 명령어를 입력했을때 Discord User Id로 비교하여 `uidsearch` 명령어 없이도 자신의 정보를 바로 확인 가능

## .env 
```.env
TOKEN={discord bot token}
CLIENT_ID={discord bot client id}
GUILD_ID={discord server duild id}
```