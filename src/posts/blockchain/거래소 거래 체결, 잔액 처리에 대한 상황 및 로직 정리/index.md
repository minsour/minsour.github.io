---
title: 거래소 거래 체결, 잔액 처리에 대한 상황 및 로직 정리
category: devlog
subCategory: blockchain
path: /blockchain/1
date: 2019-11-24 11:05:00
---

거래소에서 매수, 매도 주분이 발생하고, 거래가 체결될 때, 매수 매도를 했던 유저들의 계좌에는 변화가 생깁니다.

그 로직을 짜기 위해, 유저들 계좌의 잔액이 어떻게 변하는지 발생할 수 있는 상황을 4가지로 분류하여 정리해보고, 각 상황마다 유저 계좌의 변화를 공식으로 정리해보며 의사코드도 작성해보고자 합니다.

아래 4가지 상황에서 오더 발생 전 유저들의 어카운트 상황은 모두 같으며, BTC의 fee는 0.0005(0.05%)입니다.<br/><br/>

### 오더 발생 전 어카운트 상황

|  account  | balance | locked |
| :-------: | :-----: | :----: |
| user1 eth |   400   |  100   |
| user1 btc |   35    |   3    |
| user2 eth |   300   |  200   |
| user2 btc |   50    |   2    |

<br/>

## Case 1. 매도가 먼저 있을 때.

tradeVolume = min(askOrder.volume, bidOrder.volume)<br/>
tradePrice = askOrder.price<br/>
differencePrice = bidOrder.price - tradePrice<br/>
fee = bidOrder.unit.fee

## _1-1. 매도의 volume이 더 클 때._

- 1st. *User1*이 *ETH*를 *0.2BTC*에 _100개_ _매도_
- 2nd. *User2*가 *ETH*를 *0.3BTC*에 _80개_ _매수_

### 오더 발생 후 어카운트 상황

|  account  |          balance           |          locked           |
| :-------: | :------------------------: | :-----------------------: |
| user1 eth |      400 - 100 = 300       |      100 + 100 = 200      |
| user1 btc |             35             |             3             |
| user2 eth |            300             |            200            |
| user2 btc | 50 - (24 + 0.012) = 25.988 | 2 + (24 + 0.012) = 26.012 |

askOrder.user.Account.askUnit.balance -= askOrder.volume<br/>
askOrder.user.Account.askUnit.locked += askOrder.volume<br/>
bidOrder.user.Account.bidUnit.balance -= bidOrder.volume \* bidOrder.price \* (1 + fee)<br/>
bidOrder.user.Account.bidUnit.locked += bidOrder.volume \* bidOrder.price \* (1 + fee)

### 거래 체결 후 어카운트 상황

|  account  |            balance            |                 locked                  |
| :-------: | :---------------------------: | :-------------------------------------: |
| user1 eth |              300              |             200 - 80 = 120              |
| user1 btc |  35 + (16 - 0.008) = 50.992   |                    3                    |
| user2 eth |        300 + 80 = 380         |                   200                   |
| user2 btc | 25.988 + (8 + 0.004) = 33.992 | 26.012 - (16 + 0.008) - (8 + 0.004) = 2 |

askOrder.user.Account.askUnit.locked -= tradeVolume<br/>
askOrder.user.Account.bidUnit.balance += tradeVolume \* tradePrice \* (1 - fee)<br/>
bidOrder.user.askUnit.balance += tradeVolume<br/>
bidOrder.user.bidUnit.balance += differencePrice \* tradeVolume \* (1 + fee)<br/>
bidOrder.user.bidUnit.locked -= (tradeVolume \* tradePrice \* (1 + fee) + differencePrice \* tradeVolume \* (1 + fee))

<br/>

## 1-_2. 매수의 volume이 더 클 때._

- 1st. *User1*이 *ETH*를 *0.2BTC*에 _80개_ _매도_
- 2nd. *User2*가 *ETH*를 *0.3BTC*에 _100개_ _매수_

### 오더 발생 후 어카운트 상황

|  account  |          balance           |          locked           |
| :-------: | :------------------------: | :-----------------------: |
| user1 eth |       400 - 80 = 320       |      100 + 80 = 180       |
| user1 btc |             35             |             3             |
| user2 eth |            300             |            200            |
| user2 btc | 50 - (30 + 0.015) = 19.985 | 2 + (30 + 0.015) = 32.015 |

askOrder.user.Account.askUnit.balance -= askOrder.volume<br/>
askOrder.user.Account.askUnit.locked += askOrder.volume<br/>
bidOrder.user.Account.bidUnit.balance -= bidOrder.volume \* bidOrder.price \* (1 + fee)<br/>
bidOrder.user.Account.bidUnit.locked += bidOrder.volume \* bidOrder.price \* (1 + fee)

### 거래 체결 후 어카운트 상황

|  account  |            balance            |                   locked                    |
| :-------: | :---------------------------: | :-----------------------------------------: |
| user1 eth |              320              |               180 - 80 = 100                |
| user1 btc |  35 + (16 - 0.008) = 50.992   |                      3                      |
| user2 eth |        300 + 80 = 380         |                     200                     |
| user2 btc | 19.985 + (8 + 0.004) = 27.989 | 32.015 - (16 + 0.008) - (8 + 0.004) = 8.003 |

askOrder.user.Account.askUnit.locked -= tradeVolume<br/>
askOrder.user.Account.bidUnit.balance += tradeVolume \* tradePrice \* (1 - fee)<br/>
bidOrder.user.askUnit.balance += tradeVolume<br/>
bidOrder.user.bidUnit.balance += differencePrice \* tradeVolume \* (1 + fee)<br/>
bidOrder.user.bidUnit.locked -= (tradeVolume \* tradePrice \* (1 + fee) + differencePrice \* tradeVolume \* (1 + fee))
<br/><br/>

## Case 2. 매수가 먼저 있을 때.

tradeVolume = min(askOrder.volume, bidOrder.volume)<br/>
tradePrice = bidOrder.price<br/>
differencePrice = askOrder.price - tradePrice<br/>
fee = bidOrder.unit.fee

## 2-1*. 매수의 volume이 더 클 때.*

- 1st. *User1*이 *ETH*를 *0.3BTC*에 _100개_ _매수_
- 2nd. *User2*가 *ETH*를 *0.2BTC*에 _80개_ _매도_

### 오더 발생 후 어카운트 상황

|  account  |          balance          |          locked           |
| :-------: | :-----------------------: | :-----------------------: |
| user1 eth |            400            |            100            |
| user1 btc | 35 - (30 + 0.015) = 4.985 | 3 + (30 + 0.015) = 33.015 |
| user2 eth |      300 - 80 = 220       |      200 + 80 = 280       |
| user2 btc |            50             |             2             |

bidOrder.user.Account.bidUnit.balance -= bidOrder.volume \* tradePrice \* (1 + fee)<br/>
bidOrder.user.Account.bidUnit.locked += bidOrder.volume \* tradePrice \* (1 + fee)<br/>
askOrder.user.Account.askUnit.balance -= askOrder.volume<br/>
askOrder.user.Account.askUnit.locked += askOrder.volume

### 거래 체결 후 어카운트 상황

|  account  |          balance           |            locked             |
| :-------: | :------------------------: | :---------------------------: |
| user1 eth |       400 + 80 = 480       |              100              |
| user1 btc |           4.985            | 33.015 - (24 + 0.012) = 9.003 |
| user2 eth |            220             |        280 - 80 = 200         |
| user2 btc | 50 + (24 - 0.012) = 73.988 |               2               |

bidOrder.user.askUnit.balance += tradeVolume<br/>
bidOrder.user.bidUnit.locked -= tradeVolume \* tradePrice \* (1 + fee)<br/>
askOrder.user.Account.askUnit.locked -= tradeVolume<br/>
askOrder.user.Account.bidUnit.balance += tradeVolume \* tradePrice \* (1 - fee)

<br/>

## 2-2*. 매도의 volume이 더 클 때.*

- 1st. *User1*이 *ETH*를 *0.3BTC*에 _80개_ _매수_
- 2nd. *User2*가 *ETH*를 *0.2BTC*에 _100개_ _매도_

### 오더 발생 후 어카운트 상황

|  account  |          balance           |          locked           |
| :-------: | :------------------------: | :-----------------------: |
| user1 eth |            400             |            100            |
| user1 btc | 35 - (24 + 0.012) = 10.988 | 3 + (24 + 0.012) = 27.012 |
| user2 eth |      300 - 100 = 200       |      200 + 100 = 300      |
| user2 btc |             50             |             2             |

bidOrder.user.Account.bidUnit.balance -= bidOrder.volume \* tradePrice \* (1 + fee)<br/>
bidOrder.user.Account.bidUnit.locked += bidOrder.volume \* tradePrice \* (1 + fee)<br/>
askOrder.user.Account.askUnit.balance -= askOrder.volume<br/>
askOrder.user.Account.askUnit.locked += askOrder.volume

### 거래 체결 후 어카운트 상황

|  account  |          balance           |          locked           |
| :-------: | :------------------------: | :-----------------------: |
| user1 eth |       400 + 80 = 480       |            100            |
| user1 btc |           10.988           | 27.012 - (24 + 0.012) = 3 |
| user2 eth |            200             |      300 - 80 = 220       |
| user2 btc | 50 + (24 - 0.012) = 73.988 |             2             |

bidOrder.user.askUnit.balance += tradeVolume<br/>
bidOrder.user.bidUnit.locked -= tradeVolume \* tradePrice \* (1 + fee)<br/>
askOrder.user.Account.askUnit.locked -= tradeVolume<br/>
askOrder.user.Account.bidUnit.balance += tradeVolume \* tradePrice \* (1 - fee)

<br/>

## 결론

같은 거래들이 체결되더라도 어떤 거래가 먼저 발생했는 지에 따라 거래 가격, 거래량 등이 달라지기 때문에, 개념을 정확히 이해하는 데 시간이 좀 걸렸습니다.

의사코드를 정리해 보니, 다음과 같은 결과가 나옵니다.

- 오더 발생 후의 로직은 모두 동일하다.
- 거래 체결 후의 로직은 Case1과 Case2만 구분해 주면 된다.
