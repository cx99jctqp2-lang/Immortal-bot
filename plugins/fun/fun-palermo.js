let handler = async (m, { conn }) => {

  const testo = `*figghi sucaminchi to ma e na zingara buttana ra via concoddia de quattru liuni ndo palazzi cimentu to pa ie nfigghiu ri nchiaccata ca ancora ti runa a mangiari e non ti sputa nda facci e tu si unu pensionatu ca grazie e 20€ ca t'arivunu ogni misi putiti mangiari pi na simana (mancu datu ca si mpoccu cu l'ali a quattrignulu) to nannu sta a zappari co iattu pilusu ro futtinu e to ziu si fuma u cracki sutta a piazza armerina to nanna perizoma to zia bagascia e cunzunta to soru a monica misa a pecorina di ibra u tuccu sutta a me casa ca sa fa mbacchiari macari de bangladesi figghiu ri sucaminchi iu ti possu veniri comu pattruni e tu u me scupinu u sta capennu? Si u me cugghiuni destru e sinistru e mu suchi ogni sira e to ma fa u restu nda patti centrali poi to frati cunnutu anniatu che vaddia e domiciliari mentri iu quannu to ma sta sula a casa ci spaccu u lettu pi quantu ammuttu e ci spaccu a carina e a colonna vettebrali e du culu a pignu ciu fazzu addivintari sangeli pe papareddi ri Catania u sta capennu? Uora pagghiazzu anfiliti ndo cessu e fammi mpumpinu ca iu sugnu supra e tu si chiú nicu ra medda ra mucca comu i to capiddi ca fetunu ri pisciazza amara e fogna di ratti bastaddi e cunzunti,uora fattilla andappari nda carina e otinni a zappari cu to nannu accussí mi fai nfauri (dopu ca facisti pumpini a tuttu librino ovviamenti) poi tinni po iri a zappari e viri quannu uschi a iunnata outri i coppa ca pigghi ogni futtutu ionnu ra to vita scecca e senza sensu uora ocucchiti suchiti u latti fumiti u cracki ndo baccuni anzemi a to pa e non ci voli autru,non mi sucari a minchia e fammi mpumpinu prima ca ti occucchi accussí a me minchia ie frisca*`;

  await conn.sendMessage(
    m.chat,
    {
      text: testo
    },
    { quoted: m }
  );
};

handler.help = ['palermo'];
handler.tags = ['giochi'];
handler.command = ['palermo'];

export default handler;
