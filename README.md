## 응급실 실시간 가용병상정보

대학교 과제 진행중...

### 최초 제안
공공데이터 오픈 API를 활용하여 React Native로 앱을 구현하는 것을 생각함.
공공데이터포털에서 여러 API들중 전국 응급의료기관 조회 서비스를 선택함.
많은 사람이 사용한다기 보다는, 급할때 분명히 쓸 수 있을 것 같다고 생각하여 제안.

- Open API를 활용 (전국 응급의료기관 조회 서비스) 
https://www.data.go.kr/subMain.jsp?param=T1BFTkFQSUAxNTAwMDU2Mw==#/L3B1YnIvdXNlL3ByaS9Jcm9zT3BlbkFwaURldGFpbC9vcGVuQXBpTGlzdFBhZ2UkQF4wMTJtMjEkQF5wdWJsaWNEYXRhUGs9MTUwMDA1NjMkQF5icm1DZD1PQzAwMDkkQF5tYWluRmxhZz10cnVl 

- 페이스북의 React Native를 통하여 구현
https://facebook.github.io/react-native/ 

### 중간고사

- 관련 API를 활용하기 위하여 분석 및 상세 기획 완료
- 샘플페이지를 작업하다가 크로스도메인 문제가 발생하여, PHP서버에서 snoopy class를 활용하여 데이터를 return 시켜주는 것으로 해결. (실제 ReactNative로 구현하는 경우는 크로스도메인 문제가 발생하지 않음. 하지만 해당 키값을 스크립트에 노출하지 않기 위하여 PHP를 이용하기로 함.)
- ReactNative로 앱 init 셋팅 완료.
- 시도 / 시군구 셀렉트 박스 테스트 완료.
- 다음 API를 통하여 좌표를 위치값으로 변경.(https://developers.daum.net/services/apis/local/geo/coord2addr)

http://wagunblog.com/School/api_parser.php?STAGE1=%EA%B2%BD%EA%B8%B0%EB%8F%84&STAGE2=%EC%84%B1%EB%82%A8%EC%8B%9C%20%EB%B6%84%EB%8B%B9%EA%B5%AC&numOfRows=999&pageNo=1

위치좌표는 다음 API를 활용하여 https://developers.daum.net/services/apis/local/geo/coord2addr
