/* Step 3 only: a display-layer reversal of I/me/my and they/them/their.
   Evidence IDs, matching state, and reasoning are deliberately untouched. */
window.ClearframePerspective = (() => {
  const pairs={i:'they',me:'them',my:'their',mine:'theirs',myself:'themselves',
    they:'I',them:'me',their:'my',theirs:'mine',themselves:'myself'};

  function swapPronouns(value){
    return String(value||'').replace(/\b(?:myself|themselves|theirs|their|mine|they|them|my|me|I)\b/gi,(word,offset,source)=>{
      const replacement=pairs[word.toLowerCase()];
      if(word.toLowerCase()==='i'){
        const beginning=offset===0||/[.!?]\s*$/.test(source.slice(0,offset));
        return beginning?'They':'they';
      }
      if(replacement==='I')return 'I';
      if(word[0]===word[0].toUpperCase())return replacement[0].toUpperCase()+replacement.slice(1);
      return replacement;
    }).replace(/\bI are\b/g,'I am').replace(/\bthey am\b/gi,word=>word[0]==='T'?'They are':'they are')
      .replace(/\bI were\b/g,'I was').replace(/\bthey was\b/gi,word=>word[0]==='T'?'They were':'they were');
  }

  return Object.freeze({swapPronouns});
})();
