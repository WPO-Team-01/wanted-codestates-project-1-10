### 배포 링크
https://humanscape-team01.netlify.app/

### 프로젝트 실행 방법
1. npm install
2. root directory에 .env 파일을 만들어서  [REACT_APP_API_URL= "제시한 추천 API URL에서 끝에 {검색어}를 제외"] 추가
3. npm start

### 구현한 기능 목록
### 1. 검색 기능 : 사용자가 입력한 키워드를 실시간으로 추천 API를 통해 추천 검색어를 받아 온 뒤, 추천 검색어 화면에 출력합니다.
  - [추천 검색어 모달] :
  추천 검색어는 제시한 사이트와 동일하게 7개까지 제공되며 최대한 제시한 사이트와 동일하게 구현하였습니다.
  
  - [추천 검색어 이동] :
  마우스뿐만 아니라 키보드로도 추천 검색어 간 이동이 가능하고 해당 검색어가 활성화됩니다. 상하 방향키, Tab을 통해 요소 간의 이동 가능합니다.
  최상단 요소에서 위로 가는 방향키 누를 시 최하단 요소로, 최하단 요소에서 아래로 가는 방향키 누를 시 최상단 요소로 이동합니다. ESC 키를 누를 시 리스트가 닫힙니다.
  
  키보드 사용자를 고려하여 개발해본 것이 처음이었고, W3C 표준문서에 나와 있는 명세가 복잡하고 옵션이 매우 많아서 시간이 꽤 걸렸습니다.
  제대로 사용하기 위해서 많은 시간을 들여 공부를 해야겠다는 생각이 들었습니다.
     
  - [Debounce] :
  Input의 Change Event에 Debounce를 걸어놔서 모든 변화에 대해 요청을 하는 것이 아닌 설정한 ms 단위의 마지막 Event만 실행되도록 구현하였습니다.
  테스트해보며 적정한 시간을 구하여 400ms로 설정하였고, 그 결과 자음 입력 시 불필요한 API 호출을 줄일 수 있었습니다.
  
  
### 2. 추천 검색어 데이터 관리 : 추천 API를 통해 받은 데이터를 로컬 스토리지에 저장하여 API 호출을 줄였습니다.
  - [데이터 캐싱] :
  API 호출 전에 로컬 스토리지에 데이터가 있는지 확인하고 캐시 히트가 된 경우 API 호출을 하지 않고 캐싱 된 데이터를 이용하였습니다.
  캐시 히트가 되지 않았다면 API 요청을 하여 받은 데이터를 로컬 스토리지에 Set(캐싱)하고 해당 데이터를 전달하였습니다.
  Redux Toolkit을 이용하여 전역으로 데이터를 관리하였으며, createAsyncThunk 이용하여 API 호출 및 캐싱 된 데이터 확인 로직을 구현하였습니다.
  
  - [만료 시간] :
  로컬 스토리지 Value 값에 expireTime을 추가하여 페이지 최초 실행 시 for in 문을 이용하여 로컬 스토리지 Value를 체크하여 현재 시각과 비교하여 만료 시간이 지났다면 삭제해주었습니다.
  현재 만료 시간은 1분으로 설정하여 1분 후 새로고침을 하면 로컬 스토리지에서 삭제됩니다.

  객체 설계부터 어떤 식으로 구현해야 할지 처음에 감을 잡기 어려웠고, Redux Toolkit도 익숙지 않아서 시간이 꽤 걸렸습니다.
  
### 3. .env : URL 유출을 막기 위해 사용하였습니다.



