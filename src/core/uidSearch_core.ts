import { SlashCommandBuilder, ChatInputCommandInteraction, User, EmbedBuilder } from 'discord.js';
import mongoose, { Schema, Document } from 'mongoose'
import { Character, languages, StarRail } from 'starrail.js';
import { Wrapper } from 'enkanetwork.js';

export default async function uidSearch_core(interaction: ChatInputCommandInteraction) {
    const client = new StarRail({ defaultLanguage: "kr", cacheDirectory: "./cache", showFetchCacheLog: true });
    client.cachedAssetsManager.cacheDirectorySetup();
    const userUid: number = interaction.options.getInteger("uid") ?? 0;
    //예외처리 
    try {
        const user = await client.fetchUser(userUid);
        //characters 
        // const characterData = await displayCharacters.starrail.getPlayer(userUid);
        // const characterName = characterData.characters.map(c => c.name);

        //debug
        //console.log(user);

        const embed = new EmbedBuilder()
            .setTitle(`${user.nickname}`)
            .setColor('White')

        //undefined 예외처리
        if (user.icon?.icon?.url)
            embed.setThumbnail(user.icon.icon.url)
        if (user.icon?.characterData?.splashImage?.url)
            embed.setImage(user.icon.characterData.splashImage.url)
        if (user.signature != null)
            embed.setDescription(user.signature)
        else
            embed.setDescription("소개가 없습니다.")

        embed.addFields(
            { name: '월드레벨', value: `${user.equilibriumLevel}` },
            { name: '레벨', value: `${user.level}`, inline: true },
            { name: 'Platform', value: `${user.platform}`, inline: true }
        )



        //{ name: '캐릭터', value: characterName[0],inline: false}
        //.setImage(`${user.icon.characterData?.splashImage.url}`);
        interaction.reply({ embeds: [embed] });
    } catch (error) {
        interaction.reply(`${error}`);
    }
}

// function addFields() {
//     throw new Error('Function not implemented.');
// }
