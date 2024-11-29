module.exports = {
    /* 숫자 형식인지 확인 */
    isValidNumber: (value) => (typeof value=='number' && value!=='' && !isNaN(Number(value))),
    
    /* 문자 형식인지 확인 */
    isValidString: (value) => (typeof value=='string' && value!==''),

    /* boolean 형식인지 확인 */
    isValidBoolean: (value) => (typeof value=='boolean'),

    /* 이메일 형식인지 확인 */
    isValidEmail: (value) => (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(value)),

    /* 올바른 pw 형식인지 확인 */
    isValidPw: (value) => {
        //string 형식 체크
        if(!module.exports.isValidString(value)) return false;

        //8글자 이상인지 체크
        if(value.length<8) return false;

        let en = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
        let num = '0123456789'
        let spe = '`~!@#$%^&*()_-+=\'\\/?.,<>{}[]'

        let isEn = false
        let isNum = false
        let isSpe = false

        value = value.split('');
        value.forEach(char => {
            isEn = isEn || en.includes(char)
            isNum = isNum || num.includes(char)
            isSpe = isSpe || spe.includes(char)
        });

        return isEn && isNum && isSpe
    },

    /* 올바른 닉네임 형식인지 확인 */
    isValidNickname: (value) => {
        //string 형식 체크
        if(!module.exports.isValidString(value)) return false;

        //8글자 이하인지 체크
        if(8<value.length) return false;

        //한글, 영어, 숫자 체크
        return /^[ㄱ-ㅎ가-힣a-zA-Z0-9 ]+$/.test(value);
    },

    /* 올바른 날짜 형식인지 확인 */
    isValidDate: (value) => /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/.test(value),

    /* 올바른 dateTime(ISO 8601 UTC) 형식인지 확인 */
    isValidDateTime: (value) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{3})?Z$/.test(value),

    /* 객체가 빈 객체인지 확인 */
    isEmptyObject: (obj) => {
        return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
    }
}