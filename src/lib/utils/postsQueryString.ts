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
  if (state.period[0] !== 1) {
    result += '&periodStart=' + state.period[0].toString();
  }
  if (state.period[1] !== 24) {
    result += '&periodEnd=' + state.period[1].toString();
  }
  if (state.participantMax[0] !== 2) {
    result += '&participantMaxStart=' + state.participantMax[0].toString();
  }
  if (state.participantMax[1] !== 12) {
    result += '&participantMaxEnd=' + state.participantMax[1].toString();
  }
  return result;
};

const makePageArray = (
  page: number,
  totalElements: number,
  totalPages: number,
) => {
  const start = page - 2;
  const end = page + 2;
  const ret = [];
  if (totalElements === 0) {
    return [];
  } else if (page > totalPages) {
    return [totalPages];
  } else {
    for (let i = start; i <= end; i++) {
      if (i >= 1 && i <= totalPages) ret.push(i);
    }
    return ret;
  }
};

const changeSearchTypeForRequest = (x: string) => {
  if (x === '제목, 내용') return 'title&content';
  if (x === '제목만') return 'title';
  if (x === '내용만') return 'content';
  return '';
};

export const decodeQs = (
  queryObject: any,
  size: number,
  totalElements: number,
  totalPages: number,
) => {
  let {
    searchType,
    keyword,
    category,
    status,
    tagIds,
    periodStart,
    periodEnd,
    participantMaxStart,
    participantMaxEnd,
    page,
  } = queryObject;

  if (searchType === undefined) {
    searchType = '제목, 내용';
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
  if (periodStart === undefined) {
    periodStart = 1;
  } else {
    periodStart = parseInt(periodStart as string);
  }
  if (periodEnd === undefined) {
    periodEnd = 24;
  } else {
    periodEnd = parseInt(periodEnd as string);
  }
  const period = [periodStart, periodEnd];
  if (participantMaxStart === undefined) {
    participantMaxStart = 2;
  } else {
    participantMaxStart = parseInt(participantMaxStart as string);
  }
  if (participantMaxEnd === undefined) {
    participantMaxEnd = 12;
  } else {
    participantMaxEnd = parseInt(participantMaxEnd as string);
  }
  const participantMax = [participantMaxStart, participantMaxEnd];
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
    `${totalElements.toString()}개의 글 / ${page as string}페이지`;
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
  const pageArray = makePageArray(page, totalElements, totalPages);

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
    payload: {
      request: {
        searchType: changeSearchTypeForRequest(searchType),
        keyword: keyword === '' ? null : keyword,
        category: category.length === 0 ? null : category,
        status: status.length === 0 ? null : status,
        tagIds: tagIds.length === 0 ? null : tagIds,
        participantMax:
          participantMax[0] === 2 && participantMax[1] === 12
            ? null
            : participantMax,
        period: period[0] === 1 && period[1] === 24 ? null : period,
      },
      qs: `?page=${page - 1}&size=${size}`,
    },
    page: page,
    showOptionText,
    showOption,
    pageArray,
  };
};
