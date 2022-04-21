import { tagList } from './tagDatabase';

const searchTypeChanger = (x: string) => {
  let y = '';
  if (x === '제목+내용') y = 'titlecontent';
  else if (x === '제목만') y = 'title';
  else if (x === '내용만') y = 'content';
  else if (x === 'titlecontent') y = '제목+내용';
  else if (x === 'title') y = '제목만';
  else if (x === 'content') y = '내용만';
  return y;
};

const makePageArray = (page: number, totalPages: number) => {
  const start = page - 2;
  const end = page + 2;
  const ret = [];
  if (page > totalPages) {
    return [totalPages];
  } else {
    for (let i = start; i <= end; i++) {
      if (i >= 1 && i <= totalPages) ret.push(i);
    }
    return ret;
  }
};

export type stateType = {
  searchType: string;
  keyword: string;
  category: string[];
  status: string[];
  tagIds: number[];
  period: number[];
  participantMax: number[];
};

export const encodeQs = (state: stateType, page: number) => {
  let result = `?page=${page}`;
  if (state.keyword !== '') {
    result += '&searchType=' + searchTypeChanger(state.searchType);
    result += '&keyword=' + state.keyword;
  }
  for (let i = 0; i < state.category.length; i++) {
    result += '&category=' + state.category[i];
  }
  for (let i = 0; i < state.status.length; i++) {
    result += '&status=' + state.status[i];
  }
  for (let i = 0; i < state.tagIds.length; i++) {
    result += '&tagIds=' + state.tagIds[i].toString();
  }
  if (state.period[0] !== 1 || state.period[1] !== 24) {
    result += '&period=' + state.period[0].toString();
    result += '&period=' + state.period[1].toString();
  }
  if (state.participantMax[0] !== 2 || state.participantMax[1] !== 12) {
    result += '&participantMax=' + state.participantMax[0].toString();
    result += '&participantMax=' + state.participantMax[1].toString();
  }
  return result;
};

export const decodeQs = (
  queryObject: any,
  size: number,
  totalPages: number,
) => {
  let {
    searchType,
    keyword,
    category,
    status,
    tagIds,
    period,
    participantMax,
    page,
  } = queryObject;

  if (searchType === undefined) {
    searchType = '제목+내용';
  } else {
    searchType = searchTypeChanger(searchType);
  }
  if (keyword === undefined) {
    keyword = '';
  }
  if (category === undefined) {
    category = [];
  } else if (typeof category === 'string') {
    category = [category];
  }
  if (status === undefined) {
    status = [];
  } else if (typeof status === 'string') {
    status = [status];
  }
  if (tagIds === undefined) {
    tagIds = [];
  } else if (typeof tagIds === 'string') {
    tagIds = [parseInt(tagIds)];
  } else {
    tagIds = tagIds.map((i: string) => parseInt(i)).slice(0, 5);
  }
  if (participantMax === undefined) {
    participantMax = [2, 12];
  } else {
    participantMax = participantMax.map((i: string) => parseInt(i)).slice(0, 2);
  }
  if (period === undefined) {
    period = [1, 24];
  } else {
    period = period.map((i: string) => parseInt(i)).slice(0, 2);
  }
  if (page === undefined) {
    page = 1;
  } else {
    page = parseInt(page as string);
    if (isNaN(page as number) || page <= 0) {
      page = 1;
    }
  }

  const showOptionText =
    (keyword === ''
      ? ''
      : `${searchType as string} 검색: "${keyword as string}" / `) +
    `${page as string}페이지`;
  const showOption = [];
  if (keyword !== '') {
    showOption.push(`Search: ${keyword as string}`);
  }
  for (let i = 0; i < category.length; i++) {
    showOption.push(category[i]);
  }
  for (let i = 0; i < status.length; i++) {
    showOption.push(status[i]);
  }
  for (let i = 0; i < tagIds.length; i++) {
    showOption.push(tagList[tagIds[i]]);
  }
  if (participantMax[0] !== 2) {
    showOption.push(`${participantMax[0] as string}명 이상`);
  }
  if (participantMax[1] !== 12) {
    showOption.push(`${participantMax[1] as string}명 이하`);
  }
  if (period[0] !== 1) {
    showOption.push(`${period[0] as string}주 이상`);
  }
  if (period[1] !== 24) {
    showOption.push(`${period[1] as string}주 이하`);
  }
  const pageArray = makePageArray(page, totalPages);
  const payload =
    encodeQs(
      {
        searchType,
        keyword,
        category,
        status,
        tagIds,
        period,
        participantMax,
      },
      page,
    ) + `&size=${size}`;

  return {
    searchState: {
      searchType,
      keyword,
      category,
      status,
      tagIds,
      period,
      participantMax,
    },
    page,
    showOptionText,
    showOption,
    pageArray,
    payload,
  };
};

export const removeSearchOption = (x: string, state: stateType) => {
  if (x.includes('Search:')) {
    return { ...state, keyword: '' };
  } else if (
    x === '스터디' ||
    x === '프로젝트' ||
    x === '공모전' ||
    x === '기타'
  ) {
    return { ...state, category: state.category.filter(i => i !== x) };
  } else if (x === '모집 중' || x === '모집 완료') {
    return { ...state, status: state.status.filter(i => i !== x) };
  } else if (tagList.includes(x)) {
    return {
      ...state,
      tagIds: state.tagIds.filter(i => i !== tagList.indexOf(x)),
    };
  } else if (x.includes('명 이상')) {
    return {
      ...state,
      participantMax: [2, state.participantMax[1]],
    };
  } else if (x.includes('명 이하')) {
    return {
      ...state,
      participantMax: [state.participantMax[0], 12],
    };
  } else if (x.includes('주 이상')) {
    return {
      ...state,
      period: [1, state.period[1]],
    };
  } else if (x.includes('주 이하')) {
    return {
      ...state,
      period: [state.period[0], 24],
    };
  } else {
    return state;
  }
};
