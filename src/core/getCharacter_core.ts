import { SlashCommandBuilder, ChatInputCommandInteraction, User, EmbedBuilder } from 'discord.js';
import { Character, CombatType, languages, StarRail } from 'starrail.js';

export default async function getCharacter_core(interaction: ChatInputCommandInteraction) {
    const client = new StarRail({ defaultLanguage: "kr", cacheDirectory: "./cache", showFetchCacheLog: true });
    client.cachedAssetsManager.cacheDirectorySetup();
    //debug
    try {
        const characters = client.getAllCharacters();
        //!. 한번에 메시지에 모든 캐릭터 이름/속성을 모두 넣어줘야함
        //{NIKNAME} 이건 출시 예정 캐릭터들인가

        const embed = new EmbedBuilder()
            .setTitle('캐릭터 목록')
            .setColor('White')
        // 모든 캐릭터 정보를 문자열로 조합
        let description = '';
        for (const character of characters) {
            const name = character.name.get();
            const combatType = character.combatType.name.get();
            // 각 캐릭터 정보를 한 줄로 추가
            description += `**${name}** — ${combatType}\n`;
        }
        embed.setDescription(description);
        // 한 번만 전송
        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        interaction.reply(`${error}`);
    }
}