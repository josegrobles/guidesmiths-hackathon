export const VALIDATE_JSON = 'VALIDATE_JSON';
export const VALIDATE_JSON_STATUS = 'VALIDATE_JSON_STATUS';
export const VALIDATE_JSON_SET = 'VALIDATE_JSON_SET';
export const VALIDATE_JSON_PUSH = 'VALIDATE_JSON_PUSH';

export function validationJson(json) {
  return {
    type: VALIDATE_JSON,
    payload: {
      json
    }
  };
}

export function validationJsonStatus(success, textSuccess) {
  return {
    type: VALIDATE_JSON_STATUS,
    payload: {
      success,
      textSuccess
    }
  };
}

export function validationJsonSet(json) {
  return {
    type: VALIDATE_JSON_SET,
    payload: {
      json
    }
  };
}

export function validationJsonPush(
  json,
  prevJson,
  environment,
  userName,
  partnerId
) {
  return {
    type: VALIDATE_JSON_PUSH,
    payload: {
      json,
      prevJson,
      environment,
      userName,
      partnerId
    }
  };
}
