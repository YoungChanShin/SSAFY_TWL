![스크린샷 2020-08-19 오후 6.02.57.png_1597827780876](https://firebasestorage.googleapis.com/v0/b/twl-image-storage.appspot.com/o/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-08-19%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.02.57.png_1597827780876?alt=media&token=ae2ea0ad-6982-4b1b-ada4-ea5e6dea9fb4)

## intro

한 글자를 입력하면 해당 글자로 시작하는 모든 키워드를 보여주고자 한다. 

한글자를 칠 때 마다 백앤드로 요청을 보내는 방법과 프론트에서 필터링해 보여주는 방법 두가지가 있는데

백앤드로 요청을 보내는 것은 시간이 오래 걸리는(컴퓨터의 입장에서) 작업이기 때문에 빠른 로딩을 위해 검색어 후보들을 프론트에 저장해 놓은 이후 필요한 키워드를 꺼내 쓰는 방식의 자동완성을 구현하고자 한다. 

`skills.js`

```javascript
const skills = [
"3Ds Max",
"AEM",
"Ajax",
"Algorithm",
  ...
  ...
]
export default skills
```

데이터를 csv파일에 크롤링해 저장하는 방법은 생략하고 이를 화면에 연결하는 방법에만 집중하도록 할 예정이다. 



## 자동완성 구현

### `selectskills.vue`

##### template

기본 원리는 인풋태그에 내용이 들어오면 해당 글자로 시작하는 키워드들을 전부 불러오는 것이다. 

키워드 후보들이 있을 경우에는 자동완성 창이 열리지만 없는 경우에는 `disabled` 클래스로 인해 `display: none; ` 속성이 적용된다. 

```html
<i class="fas fa-search">
        <input v-model="skillInput" @input="submitAutoComplete" type="text" style="margin-bottom : 15px;" />
      </i>
<div class="autocomplete disabled">
  <div
       @click="searchSkillAdd"
       style="cursor: pointer"
       v-for="(res,i) in result"
       :key="i"
       >{{ res }}</div>
</div>
```



##### script

인풋 태그에 글자가 입력되면 동작되는 `submitAutoComplete` 함수는 자동완성 박스를 노출시키고 `skills.js`에서 해당 글자로 시작하는 키워드들을 필터링해 result에 담는다. 

```javascript
import skills from "../skills.js";

export default {
  data() {
    return {
      skillInput: null,
      result: null,
    };
  },
  methods: {
    submitAutoComplete() {
      const autocomplete = document.querySelector(".autocomplete");
      if (this.skillInput) {
        autocomplete.classList.remove("disabled");
        this.result = skills.filter((skill) => {
          return skill.match(new RegExp("^" + this.skillInput, "i"));
        });
      } else {
        autocomplete.classList.add("disabled");
      }
    },
  }
}
```

##### 번외 : 정규표현식

**해당 글자로 시작**하는 키워드를 뽑아내기 위해 `^` 를 사용하고, 대소문자 구분 없이 찾아내기 위해 `i` 옵션을 사용한다. 