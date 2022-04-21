const cleanApplyList = (applyList: any, writeList: any) => {
  const idList: any[] = [];
  for (let i = 0; i < writeList.length; i++) {
    idList.push(writeList[i].id);
  }
  return applyList.filter((i: any) => !idList.includes(i.id));
};

export default cleanApplyList;
