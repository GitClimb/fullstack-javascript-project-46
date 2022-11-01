const stylish = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, detph) => {
    if (!Object.is(typeof currentValue, typeof []) || currentValue === null) {
      return `${currentValue}`;
    }

    const indentSize = detph * spacesCount;
    const frontIndent = replacer.repeat(indentSize - 1);
    const rearIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        if (key.startsWith('+ ') || key.startsWith('- ')) {
          return `${frontIndent}${key}: ${iter(val, detph + 1)}`;
        }
        return `${frontIndent}  ${key}: ${iter(val, detph + 1)}`;
      });
    return ['{', ...lines, `${rearIndent}}`].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
