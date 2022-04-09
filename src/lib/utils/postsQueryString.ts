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
  let result = '?searchType=' + state.searchType;

  if (state.keyword !== '') {
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

  return result + `&page=${page}`;
};

export const decodeQs = (queryString: any) => {
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
  } = queryString;

  if (searchType === undefined) {
    searchType = '제목+내용';
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
    tagIds = tagIds.map((i: string) => parseInt(i));
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
    request: {
      searchType: searchType,
      keyword: keyword === '' ? null : keyword,
      category: category.length === 0 ? null : category,
      status: status.length === 0 ? null : status,
      tagIds: tagIds.length === 0 ? null : tagIds,
      period: period[0] === 1 && period[1] === 24 ? null : period,
      participantMax:
        participantMax[0] === 2 && participantMax[1] === 12
          ? null
          : participantMax,
    },
    page:
      queryString.page === undefined ? 1 : parseInt(queryString.page as string),
  };
};
