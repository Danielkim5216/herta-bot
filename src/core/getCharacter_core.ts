import { SlashCommandBuilder, ChatInputCommandInteraction, User, EmbedBuilder } from 'discord.js';
import { Character, CombatType, languages, StarRail } from 'starrail.js';

export default async function getCharacter_core(interaction: ChatInputCommandInteraction) {
    const client = new StarRail({ defaultLanguage: "kr", cacheDirectory: "./cache", showFetchCacheLog: true });
    client.cachedAssetsManager.cacheDirectorySetup();
    //debug
    try {
        const characters = client.getAllCharacters();
        for (const character of characters) {
            const name = character.name.get();
            const combatType = character.combatType.name.get();
        }

        // const embed = new EmbedBuilder()
        //     .setTitle("캐릭터")
        //     .setColor('White')
        //     .addFields(
        //         { name: '이름-원소', value: `"${name}" - ${combatType}` }
        //     )
        // interaction.reply({ embeds: [embed] });

        // for (const character of characters) {
        //     const name = character.name.get();
        //     const combatType = character.combatType.name.get();
        //     console.log(`"${name}" - ${combatType}`);

        //     interaction.reply(`"${name}" - ${combatType}`);
        // }
    } catch (error) {
        interaction.reply(`${error}`);
    }
}