import { SlashCommandBuilder, ChatInputCommandInteraction, User, EmbedBuilder } from 'discord.js';
import { Character, CombatType, languages, StarRail } from 'starrail.js';

export default async function getlightconeInfo_core(interaction: ChatInputCommandInteraction) {
    const client = new StarRail({ defaultLanguage: "kr", cacheDirectory: "./cache", showFetchCacheLog: true });
    client.cachedAssetsManager.cacheDirectorySetup();
    const lightConeName: string = interaction.options.getString
        ("lightconename") ?? "";
    //광추 이름에 띄어쓰기가 있으면 검색이 안된다 시발! 공백 제거해야함
    let lightConeImageurl: string = "";
    let lightConestar: number = 0;
    let lightConepath: string = "";
    try {
        function extractColorText(input: string): string | null {
            const regex = /<color=#f29e38ff>(.*?)<\/color>/;
            const match = input.match(regex);
            return match ? match[1] : null;  // match[1]이 <color>와 </color> 사이의 텍스트입니다.
        }

        const lightCones = client.getAllLightCones();
        // 모든 광추를 검색하면서 이름 비교
        for (const lightCone of lightCones) {
            const lightconeNames: string = lightCone.name.get("kr");
            // 공백을 제거한 후 비교하거나, 필요시 다른 문자로 바꾸기
            const formattedLightConeName = lightConeName.replace(/\s+/g, "");  // 모든 공백 제거
            if (formattedLightConeName === lightconeNames.replace(/\s+/g, "")) { // 서버에서 가져온 이름도 공백 제거
                lightConeImageurl = lightCone.icon.url; // or cardImage.url
                lightConestar = lightCone.stars;
                //lightConepath = lightCone.itemDescription.get("kr");
                lightConepath = extractColorText(lightCone.itemDescription.get("kr")) ?? "";
                break;
            }
        }
        // 결과가 없다면 처리
        if (!lightConeImageurl) {
            return interaction.reply("해당 광추를 찾을 수 없습니다.");
        }
        const embed = new EmbedBuilder()
            .setTitle(`${lightConeName}`)
            .setColor('White')
            .setImage(lightConeImageurl);

        embed.addFields(
            { name: '운명의 길', value: `${lightConepath}`, inline: true },
            { name: '등급', value: `${lightConestar}성`, inline: true }
        )


        interaction.reply({ embeds: [embed] });
    } catch (error) {
        interaction.reply(`${error}`);
    }

}